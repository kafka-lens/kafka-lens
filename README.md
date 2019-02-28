![alt-text](kl-f-logo.png)

# Kafka Lens
### A visualization tool for your Kafka cluster. 
#### Inspect the data pipeline for your Kafka topics, partitions, and messages in real-time.

Kafka Lens aims to give developers a tool to easily inspect a Kafka cluster in real-time to enable easier troubleshooting of cluster problems. Now you can easily test whether new services are functioning correctly by monitoring the messages as they are sent to your cluster without the need to inspect the cluster through the CLI.
A real-time visualization tool for you Kafka cluster.

![](kl-g.gif)

## 5 Steps for a quick start up

Follow these quick steps to launch the application.

```
1. npm install
2. npm run webpack
3. cd into your 'kafka-lens' folder
4. run this script in your command line: './node_modules/.bin/electron-rebuild'
5. npm start
```

### Connecting to Your Broker

Enter the URI of your Kafka broker (e.g. kafka1.contoso.com:9092) then click 'Connect' to connect to your Kafka broker. Once you are connected, you are ready to start consuming messages in real-time. 

![](cp-rm.gif)


