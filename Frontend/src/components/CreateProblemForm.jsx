/**
 * Create Problem Form Component
 * @fileoverview Form for creating new coding problems with test cases
 */

import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';

const CreateProblemForm = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        rating: 800,
        tags: '',
        description: '',
        constraints: '',
        sampleInput: '',
        sampleOutput: '',
        notes: ''
    });

    const [testCases, setTestCases] = useState([
        { input: '', output: '' }
    ]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleTestCaseChange = (index, field, value) => {
        const newTestCases = [...testCases];
        newTestCases[index][field] = value;
        setTestCases(newTestCases);
    };

    const addTestCase = () => {
        setTestCases([...testCases, { input: '', output: '' }]);
    };

    const removeTestCase = (index) => {
        if (testCases.length > 1) {
            setTestCases(testCases.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validation
        if (!formData.title.trim()) {
            setError('Title is required');
            setLoading(false);
            return;
        }

        if (!formData.description.trim()) {
            setError('Description is required');
            setLoading(false);
            return;
        }

        // Validate test cases
        const validTestCases = testCases.filter(tc => tc.input.trim() && tc.output.trim());
        if (validTestCases.length === 0) {
            setError('At least one test case is required');
            setLoading(false);
            return;
        }

        try {
            // Convert tags to JSON array format
            const tagsArray = formData.tags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);

            const payload = {
                title: formData.title,
                rating: parseInt(formData.rating),
                tags: JSON.stringify(tagsArray),
                description: formData.description,
                constraints: formData.constraints,
                sampleInput: formData.sampleInput,
                sampleOutput: formData.sampleOutput,
                notes: formData.notes,
                testCases: validTestCases
            };

            const response = await axios.post('http://localhost:3030/admin/problems', payload);

            if (response.data.success) {
                alert('Problem created successfully!');
                if (onSuccess) onSuccess();
                onClose();
            }
        } catch (err) {
            console.error('Error creating problem:', err);
            setError(err.response?.data?.message || 'Failed to create problem');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl my-8">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white rounded-t-2xl">
                    <h2 className="text-2xl font-bold text-gray-900">Create New Problem</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Problem Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Two Sum"
                        />
                    </div>

                    {/* Rating and Tags */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Difficulty Rating *
                            </label>
                            <input
                                type="number"
                                name="rating"
                                value={formData.rating}
                                onChange={handleInputChange}
                                required
                                min="100"
                                max="3000"
                                step="100"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">Range: 100-3000</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tags (comma-separated)
                            </label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., array, hash-table, math"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Problem Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe the problem clearly..."
                        />
                    </div>

                    {/* Constraints */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Constraints *
                        </label>
                        <textarea
                            name="constraints"
                            value={formData.constraints}
                            onChange={handleInputChange}
                            required
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., 1 <= n <= 10^5"
                        />
                    </div>

                    {/* Sample Input/Output */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sample Input *
                            </label>
                            <textarea
                                name="sampleInput"
                                value={formData.sampleInput}
                                onChange={handleInputChange}
                                required
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                                placeholder="Example input..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sample Output *
                            </label>
                            <textarea
                                name="sampleOutput"
                                value={formData.sampleOutput}
                                onChange={handleInputChange}
                                required
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                                placeholder="Expected output..."
                            />
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notes (Optional)
                        </label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows="2"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Additional notes or hints..."
                        />
                    </div>

                    {/* Test Cases */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Test Cases * (Hidden from users)
                            </label>
                            <button
                                type="button"
                                onClick={addTestCase}
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                            >
                                <Plus size={16} />
                                Add Test Case
                            </button>
                        </div>

                        <div className="space-y-3">
                            {testCases.map((testCase, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">
                                            Test Case {index + 1}
                                        </span>
                                        {testCases.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeTestCase(index)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">Input</label>
                                            <textarea
                                                value={testCase.input}
                                                onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                                                rows="2"
                                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                placeholder="Test input..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">Expected Output</label>
                                            <textarea
                                                value={testCase.output}
                                                onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                                                rows="2"
                                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                placeholder="Expected output..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                            loading
                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        {loading ? 'Creating...' : 'Create Problem'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateProblemForm;
