#!/bin/bash

EXE=go/dist/feeling.systems_darwin_amd64_v1/feeling.systems
CMD="$EXE -port 8080"
PID=""

trap whatever SIGINT

whatever() {
  pkill -f $EXE
}

echo $@

fswatch -l2 -r -o $@ | while read ok ; do \

  if [ ! -z "$PID" ]; then

    kill $PID > /dev/null

    while kill -0 $PID >/dev/null; do
      echo "waiting..."
      sleep 1
    done
  fi

  make exec

  echo
  echo
  echo

  $CMD &

  PID=$!
done;
