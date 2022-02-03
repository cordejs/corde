#!/bin/bash

cd KillNodeProcess 

if [ ! -d "bin" ]; then
  dotnet build
fi

dotnet run