# If you prefer to use pinned revision:
#with import
#    (builtins.fetchTarball {
#        name = "nixos-23.05";
#        url = "https://github.com/NixOS/nixpkgs/archive/b7cde1c47b73.tar.gz";
#        sha256 = "0xry0farxln7cjas4zfip4s1hfl2x9lbwb0imsla0zqvzhvbz729";
#    })
#    { };

with import <nixpkgs> {};

mkShell {
	name = "dev-environment";
	buildInputs = [
		git
        nodejs_20
        
        # compiling node-pty module
        python39
        gnumake
        gcc

        # runtime dependecy
        texlive.combined.scheme-full
	];
    shellHook = ''
		echo "Starting latex-sin-demora development shell"
		# git prompt
		source ${git}/share/git/contrib/completion/git-prompt.sh
		PS1='\[\033[0;33m\]nix:\w\[\033[0m\] $(__git_ps1 %s)\n$ '
	'';
}
