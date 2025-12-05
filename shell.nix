    { pkgs ? import <nixpkgs> {} }:

    pkgs.mkShell {
      buildInputs = with pkgs; [
        nodejs_24
        typescript
        pnpm 
      ];

      shellHook = ''
	zsh
        export PATH=$(pwd)/node_modules/.bin:$PATH
      '';
    }
