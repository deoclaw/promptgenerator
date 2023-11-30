# Prompt Generator

PWA that generates writing/art prompts

## To view:

Download repository, unzip, open index.html on computer.

## Functionality Goals:

- Mobile responsive :white_check_mark:
- Users can re-roll prompts :white_check_mark:
- Users can save prompts :white_check_mark:
- Users can interact off-network :white_check_mark:
- Users can persist saved prompts in a session (no login, only session storage) :x:
- Users can persist saved prompts with an account :white_check_mark:
- Actual prompts as opposed to dummy prompts :x:

## Scripting To Do List:

- ~~create array of prompts and use RNG to pick a prompt and display within main prompt div when 'new prompt' btn pressed~~ :white_check_mark:
- allow for storing a session (no login)
- ~~allow for storing to cache/offline mode~~ :white_check_mark:
- ~~allow for user account creation~~ :white_check_mark:

## Future Considerations

- I would rather die than have to copy-paste all my HTML changes -- what would be the best way to componentize this? Or would it be better to start from scratch say a React app?
- What if I want multiple users to log in? Would the sollution be creating a collection of user IDs and then storing an array of prompts?
