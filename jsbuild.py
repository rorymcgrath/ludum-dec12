#!/usr/bin/env python

"""Shitty JS project build script v0.1"""

import os

def buildProject(outname, templatename):
    template = open(templatename, "r")
    outfile = open(outname, "w")
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

if __name__ == "__main__":
    buildProject("game.js", "template.js")
