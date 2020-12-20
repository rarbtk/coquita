# cd /docker-entrypoint-initdb.d/
# echo "import data1..."
#gzip -dc ./dump1.gz | mysql -h localhost -u root -ppassword -P 3306 test_db1

# echo "done."