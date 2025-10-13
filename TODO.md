# TODO: Fix Nginx Serving Default Page Instead of React App

## Steps to Complete
- [x] Edit Frontend/Employee-Client/vite.config.js to change base from '/ems/' to '/'
- [x] Navigate to docker-git-fullstackapp directory
- [x] Run docker-compose down to stop existing containers
- [x] Run docker-compose up --build to rebuild and start containers
- [ ] Verify the React app loads at http://localhost:5173/ instead of the nginx welcome page
- [ ] If issues persist, check container logs for build or runtime errors
