# EFK (Elastic, Fluentd, Kibana) on Kubernetes (GKE)

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

# add elastic repository to helm
helm repo add elastic https://helm.elastic.co

# install elasticsearch
helm install elasticsearch elastic/elasticsearch -f elastic-values.yaml

# wait until the elastic pods ready
kubectl get pods

# install kibana and connect to elasticsearch
helm install kibana elastic/kibana -f kibana-values.yaml --set service.type=LoadBalancer

# wait until the kibana pods ready
kubectl get pods

# install fluentd
helm repo add kokuwa https://kokuwaio.github.io/helm-charts
helm install fluentd kokuwa/fluentd-elasticsearch -f fluentd-values.yaml
```