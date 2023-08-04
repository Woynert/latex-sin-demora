## Resources

- [readthedocs Using latexmk](https://mg.readthedocs.io/latexmk.html)

## Commands

Compile using latex

```sh
latexmk -pdfps ./file.tex
```

Compile using pdflatex

```sh
latexmk -pdf ./file.tex
```

Clean all the generated files

```sh
latexmk -C
```

Compile with latex, continuosly check for file updates, don't open previewer, cd into source folder when compiling

```sh
latexmk -pdfps -pvc -pv- -cd -interaction=nonstopmode ./file.tex
```

Compile with latex, set output file name, set output directory, disable non pdf formats

```sh
latexmk -pdfps -output-format=pdf -jobname=myfinalfile -outdir=./.cache/latexmk/ ./file.tex
```

Last two combined

```sh
latexmk -pdfps -pvc -pv- -cd -output-format=pdf -interaction=nonstopmode -jobname=myfinalfile -outdir=./.cache/latexmk/ ./file.tex
```
