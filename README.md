# Prompt Generator

PWA that generates writing/art prompts

## To view:

Download repository, unzip, open index.html on computer.

## Functionality Goals:

- Mobile responsive :white_check_mark:
- Users can re-roll prompts :x:
- Users can save prompts :x:
- Users can interact off-network :x:
- Users can persist saved prompts in a session :x:
- Users can persist saved prompts in an account :x:

## Scripting To Do List:

- create array of prompts and use RNG to pick a prompt and display within main prompt div when 'new prompt' btn pressed
- create function to clone current prompt and add to saved prompts section (use cloneNode and children)
- allow for storing a session (no login)
- allow for storing to cache/offline mode
- allow for user account creation?

## Future Considerations

- I would rather die than have to copy-paste all my HTML changes -- what would be the best way to componentize this? Or would it be better to start from scratch say a React app?
