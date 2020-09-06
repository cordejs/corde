:: Corde documentation deploy using bat file
@ECHO OFF
cmd /C "set "GIT_USER=%1" && yarn docusaurus deploy"