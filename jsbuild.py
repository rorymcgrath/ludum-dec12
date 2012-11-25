#!/usr/bin/env python

"""Shitty JS project build script v0.2"""

import os
from PIL import Image

def buildProject(outname, templatename):
    template = open(templatename, "r")
    outfile = open(outname, "w")

    levelDir = os.path.abspath("data")
    outfile.write("var levelData = {\n")
    for fileName in os.listdir(levelDir):
        outfile.write(fileName.split(".")[0] + "Pixels")
        outfile.write(" : [")
        im = Image.open(os.path.join("data", fileName))
        w, h = im.size
        for r in range(h):
            for c in range(w):
                outfile.write(",".join([str(p) for p in im.getpixel((c, r))]))
                outfile.write(",")
        outfile.write("],\n")
        outfile.write("%sWidth : %s,\n" % (fileName.split(".")[0], w))
        outfile.write("%sHeight : %s,\n" % (fileName.split(".")[0], h))
    outfile.write("}\n")

    for i, line in enumerate(template):
        if "#include" in line:
            incfile = line.split()[1]
            jspath = os.path.abspath(incfile)
            if os.path.exists(jspath):
                f = open(jspath, "r")
                for x in f:
                    outfile.write(x)
            else:
                print 'ERROR in: "%s", line: %i' % (templatename, i + 1)
                print 'File "%s" not found, FAILED.' % incfile
                outfile.close()
                os.remove(outname)
                sys.exit()
        else:
            outfile.write(line)
    template.close()
    outfile.close()
    print "BUILD COMPLETE"

if __name__ == "__main__":
    buildProject("game.js", "template.js")
