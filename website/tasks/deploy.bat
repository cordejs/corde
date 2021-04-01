:: Corde documentation deploy using bat file
@ECHO OFF
set USER=lucasgmagalhaes
cmd /C "set "GIT_USER=%USER" && yarn docusaurus deploy"