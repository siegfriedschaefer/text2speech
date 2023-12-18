
// Write a function to create symlinks from one file in one directory to another file in another directory.
// The function takes two parameters: the source directory path and the target directory path.

import os
import shutil

def create_symlink(src_dir, dst_dir):
    if not os.path.exists(src_dir):
        print("Source directory does not exist!")
        return
    if not os.path.exists(dst_dir):
        print("Target directory does not exist!")
        return
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            src_file = os.path.join(root, file)
            dst_file = os.path.join(dst_dir, file)
            if os.path.exists(dst_file):
                print("File already exists in target directory!")
                continue
            os.symlink(src_file, dst_file)  # Create a symlink 
            print("Create symlink %s => %s" % (src_file, dst_file))

if __name__ == "__main__":
    create_symlink("/home/airobot/Downloads", "/home/airobot/Downloads/Downloads")  
    # Create a symlink from /home/airobot/Downloads to /home/airobot/Downloads/Downloads

# Path: tutorials/ai_rookie_008/file_link.py
    
