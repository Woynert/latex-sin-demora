let
  pkgs = import (fetchTarball {
    name = "nixos-23.05";
	url = "https://github.com/NixOS/nixpkgs/archive/b7cde1c47b73.tar.gz";
    sha256 = "0xry0farxln7cjas4zfip4s1hfl2x9lbwb0imsla0zqvzhvbz729";
  }) { };

in pkgs.mkShell {
	name = "dev-environment";
	buildInputs = [
        pkgs.texlive.combined.scheme-full
	];
}

