# EFK (Elastic, Fluentd, Kibana) on Kubernetes

## Requirements:
* [Helm](https://helm.sh/docs/intro/install/)

# NOTES: change all password with yours

## Setup
```console
# create namespace logging
kubectl create namespace logging
kubectl config set-context --current --namespace=logging
git clone https://github.com/CoverID/EFK-Kubernetes
cd EFK-Kubernetes

# add bitnami repository to helm
helm repo add bitnami https://charts.bitnami.com/bitnami

# install elasticsearch
helm install elasticsearch bitnami/elasticsearch -f elastic-helm.yaml

# wait until the elastic pods ready
kubectl get pods

# install kibana and connect to elasticsearch
helm install kibana bitnami/kibana -f kibana-helm.yaml

# wait until the kibana pods ready
kubectl get pods

# create config-map for fluentd to connect elasticsearch
kubectl apply -f elastic-configmap.yaml

# install fluentd
helm install fluentd bitnami/fluentd --set aggregator.configMap=elasticsearch-output --set aggregator.extraEnv[0].name=ELASTIC_HOST --set aggregator.extraEnv[0].value=elasticsearch-coordinating-only --set aggregator.extraEnv[1].name=ELASTIC_PORT --set aggregator.extraEnv[1].value=9200 --set aggregator.extraEnv[2].name=ELASTIC_USERNAME --set aggregator.extraEnv[2].value=elastic --set aggregator.extraEnv[3].name=ELASTIC_PASSWORD --set aggregator.extraEnv[3].value=12345678
```