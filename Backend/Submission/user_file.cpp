#include <bits/stdc++.h>
using namespace std;


void solve() {
    int a, b; cin>>a>>b;
    if(b == 0){
        cout << -1 << endl;
    }else{
        cout << (a  % b) << endl;
    }
}

int32_t main() {
    ios::sync_with_stdio(false); cin.tie(0); cout.tie(0);

    int t = 1;
    while (t--) {
        solve();
    }

    return 0;
}