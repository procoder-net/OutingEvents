#!/bin/bash

set -e

ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." >/dev/null 2>&1 && pwd )"

source ${ROOT_DIR}/server/variables.env

if sudo -u postgres psql --list | grep ${PGDATABASE} ; then
    echo "Database already exists"
    echo "Drop db if you need to recreate it:"
    echo "sudo -u postgres psql -c 'DROP DATABASE ${PGDATABASE};'"
else
    sudo -u postgres psql -c "CREATE DATABASE ${PGDATABASE};"
    sudo -u postgres psql -c "CREATE USER ${PGUSER} WITH PASSWORD '${PGPASSWORD}';" || true
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE ${PGDATABASE} to ${PGUSER};" || true
fi

sudo -u postgres PGPASSWORD="${PGPASSWORD}" psql -h localhost -U ${PGUSER} -d ${PGDATABASE} -a -f ${ROOT_DIR}/sql/createtables.sql

