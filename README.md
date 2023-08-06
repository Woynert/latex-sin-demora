# Latex sin demora

A latex "IDE" centered around cli tools.

![preview](https://github.com/Woynert/latex-sin-demora/assets/61242172/15838205-8122-46a1-bb7c-9762deec7216)

# Features

- Integrated terminal for editing with cli editors, such as vim or emacs.
- Updates preview on file changes.
- Preview is compiled with whatever version of `latexmk` is available on your system.
- [Mozilla's featureful PDF viewer.](https://github.com/mozilla/pdf.js)
- Resizable panels.

# Running

This projects depends on `latexmk` to build pdf files from `.tex` files.

You can install it with your distribution's package manager (Ej. Ubuntu):

```sh
apt install latexmk
```

Or you can use the provided [shell.nix](/shell.nix) and [shell-latexmk.nix](/shell-latexmk.nix) environments
which have all required packages, [see how to install Nix](https://nixos.org/download.html):

```bash
nix-shell # defaults to shell.nix, also includes build dependecies
# or
nix-shell shell-latexmk.nix # the same but includes latexmk
```
 
## Live run

1. `npm install` Install dependencies
2. `npm run compile` Compile native depedencies
3. `npm start` Run

## Packaging appimage

1. `npm install` Install dependencies
2. `npm run compile` Compile native depedencies
3. `npm run package` Packages Appimage with electron-builder
