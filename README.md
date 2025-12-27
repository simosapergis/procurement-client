# procurement-client
A smart procurement &amp; invoicing automation platform for small and medium businesses.

# set cors for bucket upload if not set already
# edit configuration in cors.json - add IP or Host name to enable CORS 
gsutil cors set cors.json gs://clean-abacus-482115-a1.firebasestorage.app
gsutil cors get gs://clean-abacus-482115-a1.firebasestorage.app


# Deploy to Google Host
# .1 Build the app
cd /Users/Shared/side_projects/procurement-client/pwa-client
npm run build

# .2 deploy
firebase deploy --only hosting


# deploy on a staging env
firebase hosting:channel:deploy notifications --only hosting
firebase hosting:channel:deploy notifications --expires 7d



# new (cloned) project
firebase projects:list
firebase use <new project id>