# Latex sin demora

A personal latex "IDE" centered around cli tools.

![da](https://github.com/Woynert/latex-sin-demora/assets/61242172/86ffa4ef-4435-49ce-9d10-ad2059aa1ecc)

# Features

- Integrated terminal for editing with cli editors, such as vim or emacs.
- Updates preview on file changes.
- Preview is compiled with whatever version of `latexmk` is available on your system.
- [Mozilla's featureful PDF viewer.](https://github.com/mozilla/pdf.js)
- Resizable panels.

# Running

1. Make sure you have `latexmk` installed on your system:

    ```sh
    # Ubuntu:
    apt install latexmk texlive-xetex
    # Nix:
    nix-shell -p texlive.combined.scheme-full
    ```

2. Download and run the appimage from [releases](https://github.com/Woynert/latex-sin-demora/releases):

    ```sh
    chmod +x latex-sin-demora.Appimage
    ./latex-sin-demora.Appimage
    ```

3. Once inside the app press the "_Select File_" button and select your `.tex` file. Aditionally a directory called `.cache` will be created in the same location, there you can find extra outputs such as the resulting __PDF__ file.

## Using Nix shell

Get a development shell with all required packages to build this project, you can use the provided [shell.nix](/shell.nix) or [shell-latexmk.nix](/shell-latexmk.nix) environments which have all required packages [(how to install Nix)](https://nixos.org/download.html):

```bash
nix-shell # defaults to shell.nix, also includes build dependecies
# or
nix-shell shell-latexmk.nix # the same but includes latexmk
```
 
## Live run

1. `npm install` Install dependencies
2. `npm run compile` Compile native depedencies
3. `npm start` Run

## Appimage

Build the Appimage using docker, the Appimage will be located in `docker/out/`:

```sh
cd docker
docker-compose -f ./compose-build.yml up --build
```

Build the Appimage manually:

1. `npm install` Install dependencies
2. `npm run compile` Compile native depedencies
3. `npm run package` Packages Appimage with electron-builder on `dist/`

