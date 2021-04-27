:: Corde documentation deploy using bat file
@ECHO OFF
set USER=cordejs
cmd /C "set "GIT_USER=%USER" && yarn docusaurus deploy"