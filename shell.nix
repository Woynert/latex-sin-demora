let
  pkgs = import (fetchTarball {
    name = "nixos-23.05";
	url = "https://github.com/NixOS/nixpkgs/archive/b7cde1c47b73.tar.gz";
    sha256 = "0xry0farxln7cjas4zfip4s1hfl2x9lbwb0imsla0zqvzhvbz729";
  }) { };

in pkgs.mkShell {
	name = "dev-environment";
	buildInputs = [
		pkgs.git
        pkgs.nodejs_20
        
        # compiling node-pty module
        pkgs.python39
        pkgs.gnumake
        pkgs.gcc
	];
	shellHook = ''
		echo "Starting latex-sin-demora development shell"

		# custom prompt
		if [ -e ~/.gitconfig ] && [ -f ~/.git-prompt.sh ]; then
			source ~/.git-prompt.sh
			PS1='\[\033[01;33m\]nix:\w\[\033[01;34m\]$(__git_ps1 " %s")\[\033[33m\]\$\[\033[00m\] '
		fi
	'';
}
