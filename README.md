when we change the git branch and if we have different backend for different environments the execute below commands to connect to specific environment backend
git checkout <branch> - this will change git branch
amplify env checkout <environment> - this switch the amplify environment

to check the list of environments
amplify env list

to use existing backend for a new environment
amplify env add <new environment> - this will create new environment in local
amplify push - this will deploy the new backend enviornment
amplify console - open the amplify console in the browser verify the nwly created environment.

amplify pull - pull changes from the backend

mulitple environments:
https://acloudguru.com/blog/engineering/multiple-serverless-environments-with-aws-amplify
https://haverchuck.github.io/docs/cli/multienv?sdk=js
https://docs.amplify.aws/cli/teams/overview


