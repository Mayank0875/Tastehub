/**
 * Code Editor Component
 * @fileoverview A simple code editor with language support
 */

import React, { useState } from 'react';

/**
 * Code Editor component with language support and themes
 * @param {Object} props - Component props
 * @param {string} props.value - Current code value
 * @param {Function} props.onChange - Code change handler
 * @param {string} props.language - Programming language (cpp, python, javascript)
 * @param {boolean} props.readOnly - Whether editor is read-only
 * @param {string} props.height - Editor height
 * @param {boolean} props.darkMode - Whether to use dark theme
 * @returns {JSX.Element} Code editor component
 */
const CodeEditor = ({ 
    value = '', 
    onChange, 
    language = 'cpp', 
    readOnly = false, 
    height = '400px',
    darkMode = false 
}) => {
    const [selectedLanguage, setSelectedLanguage] = useState(language);

    /**
     * Handle language change
     * @param {Event} event - Change event
     */
    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setSelectedLanguage(newLanguage);
        
        // Notify parent component about language change
        if (onChange) {
            onChange(value, newLanguage);
        }
    };

    /**
     * Handle code change
     * @param {Event} event - Change event
     */
    const handleCodeChange = (event) => {
        const newValue = event.target.value;
        if (onChange) {
            onChange(newValue, selectedLanguage);
        }
    };

    /**
     * Get default template for language
     * @param {string} lang - Language identifier
     * @returns {string} Default code template
     */
    const getDefaultTemplate = (lang) => {
        switch (lang) {
            case 'cpp':
            case 'c++':
                return `#include <iostream>
using namespace std;

int main() {
    // Your code here
    return 0;
}`;
            case 'python':
            case 'py':
                return `# Your code here
def main():
    pass

if __name__ == "__main__":
    main()`;
            case 'javascript':
            case 'js':
                return `// Your code here
function main() {
    // Implementation here
}

main();`;
            default:
                return '// Your code here';
        }
    };

    const languageOptions = [
        { value: 'cpp', label: 'C++', extension: 'cpp' },
        { value: 'python', label: 'Python', extension: 'py' },
        { value: 'javascript', label: 'JavaScript', extension: 'js' }
    ];

    return (
        <div className="w-full">
            {/* Language Selector */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Programming Language
                </label>
                <select
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    disabled={readOnly}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                    {languageOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Code Editor */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
                <textarea
                    value={value || getDefaultTemplate(selectedLanguage)}
                    onChange={handleCodeChange}
                    readOnly={readOnly}
                    className="w-full p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-gray-50"
                    style={{ height }}
                    placeholder="Write your code here..."
                    spellCheck="false"
                />
            </div>

            {/* Editor Info */}
            <div className="mt-2 text-xs text-gray-500 flex justify-between">
                <span>
                    Language: {languageOptions.find(opt => opt.value === selectedLanguage)?.label}
                </span>
                <span>
                    Lines: {value.split('\n').length} | Characters: {value.length}
                </span>
            </div>
        </div>
    );
};

export default CodeEditor;
