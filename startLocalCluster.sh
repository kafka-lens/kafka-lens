# ./bin/zookeeper-server-start.sh config/zookeeper.properties
# ./bin/kafka-server-start.sh config/server.properties
# ./bin/kafka-server-start.sh config/server-1.properties
# ./bin/kafka-server-start.sh config/server-2.properties
# ./bin/kafka-console-producer.sh --broker-list localhost:9092 --topic

kafka=${1:-~/kafka_2.12-2.3.0/}
topic=${2:-first}
cd "$kafka" || exit
echo in folder: $(pwd)
# BROKER1="${$3:-server}"
# BROKER2="${$4:-server-1}"
# BROKER3="${$5:-server-2}"

gnome-terminal --tab --title="zookeeper" --command="bash -c './bin/zookeeper-server-start.sh config/zookeeper.properties; $SHELL'" \
--tab --title="broker 1" --command="bash -c './bin/kafka-server-start.sh config/${3:-server}.properties; $SHELL'" \
--tab --title="broker 2" --command="bash -c './bin/kafka-server-start.sh config/${4:-server-1}.properties; $SHELL'" \
--tab --title="broker 3" --command="bash -c './bin/kafka-server-start.sh config/${5:-server-2}.properties; $SHELL'" \
--tab --title="producer ${topic}" --command="bash -c './bin/kafka-console-producer.sh --broker-list localhost:9092 --topic ${topic}; $SHELL'"
