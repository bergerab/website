# keep hash of every file within given list of directories
# if something in the list updates,
# build.py to do a partial update of that file
import argparse
from glob import glob
import os
from sys import argv
import sched, time
from build import build as build_site
from build import TEMPLATE_NAME

mtimes = {}

RED = 31
GREEN = 32
YELLOW = 33
BLUE = 34

build = False

def color_string(*msg, color=GREEN):
    return '\x1b[1;' + str(color) + 'm' + ' '.join(map(str, msg)) + '\x1b[0m'

# need to watch template files
# if a single template file changes
# need to recompile entire folder

def watch(src='./src', dist='./dist', dirs=None, interval=0.5, force_build=False):
    global build
    build = force_build
    
    src = os.path.realpath(src)
    dist = os.path.realpath(dist)

    if not dirs:
        dirs = [src]
    
    scheduler = sched.scheduler(time.time, time.sleep)
    def scan(scheduler):
        global build
        
        paths = []
        for dir in dirs:
            realpath = os.path.join(src, dir)
            paths += filter(lambda x: not os.path.isdir(x), glob(os.path.join(realpath, '**', '*'), recursive=True))

            # add in .template.html files
            paths += glob(os.path.join(realpath, '**', TEMPLATE_NAME), recursive=True)

        added_paths = []
        removed_paths = []
        modified_paths = []
        
        for path in paths:
            mtime = os.path.getmtime(path)
            
            was_added = path not in mtimes
            was_modified = not was_added and mtime != mtimes[path]

            if build:
                if was_added:
                    added_paths.append(path)
                elif was_modified:
                    modified_paths.append(path)

            if was_added or was_modified or not build:
                mtimes[path] = mtime

        build = True
        
        if len(paths) != len(mtimes):
            removed_paths = set(mtimes) - set(paths)
            for path in removed_paths:
                del mtimes[path]

        updates = added_paths + modified_paths + list(removed_paths)
        if updates:
            if added_paths:
                print('%s Additions' % len(added_paths))
                for path in added_paths:
                    print('\t %s %s' % (color_string('+', color=GREEN), path))
            if modified_paths:
                print('%s Modifications' % len(modified_paths))
                for path in modified_paths:
                    print('\t %s %s' % (color_string('!', color=BLUE), path))
            if removed_paths:
                print('%s Removals' % len(removed_paths))
                for path in removed_paths:
                    print('\t %s %s' % (color_string('-', color=RED), path))

        # if a .template.html file has changed, update entire directory
        for i in range(len(updates)):
            if updates[i].endswith(TEMPLATE_NAME):
                updates[i] = os.path.dirname(updates[i])

        if updates:
            build_site(src=src, dist=dist, build_dirs=updates)
        scheduler.enter(interval, 1, scan, (scheduler,))
        
    scheduler.enter(interval, 1, scan, (scheduler,))
    scheduler.run()

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Watch the website files and compiles files that change')
    parser.add_argument('dirs', type=str, help='Directories to watch', default=None, nargs='*')
    parser.add_argument('--src', type=str, help='Root directory containing source files', default='./src')
    parser.add_argument('--dist', type=str, help='Directory to produce output', default='./dist')
    parser.add_argument('--interval', type=float, help='How frequently to scan (in seconds)', default=0.5)
    parser.add_argument('--force-build', action='store_true', help='Forces the watcher to build all files on start')            
    args = parser.parse_args()
    watch(src=args.src, dist=args.dist, dirs=args.dirs, interval=args.interval, force_build=args.force_build)
