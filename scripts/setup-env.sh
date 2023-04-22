doppler login

# Would you like to scope your new login to the current directory, or overwrite the existing global login?
# ? Select an option: Overwrite global login (/)
# ? Open the authorization page in your browser? Yes
# Complete authorization at https://dashboard.doppler.com/workplace/auth/cli
# Your auth code is:
# Waiting...
# Welcome, You

doppler setup

# ? Select a project: name
# ? Select a config: env
# ┌─────────┬─────────┬───────────────┐
# │ NAME    │ VALUE   │ SCOPE         │
# ├─────────┼─────────┼───────────────┤
# │ config  │ dev     │ /path/to/repo │
# │ project │ name    │ /path/to/repo │
# └─────────┴─────────┴───────────────┘

doppler secrets download --no-file --format env > .env

# Then check .env file in the project root
