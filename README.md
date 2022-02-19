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

# install elasticsearch
helm install elasticsearch elastic/elasticsearch -f elastic-helm.yaml
kubectl port-forward svc/elasticsearch-master 9200

# wait until the elastic pods ready
kubectl get pods

# install kibana and connect to elasticsearch
helm install kibana elastic/kibana -f kibana-helm.yaml
kubectl port-forward svc/kibana-kibana 5601:5601
kubectl port-forward kibana-kibana-[Your-Kibana-Pod-Name] 5601:5601

# wait until the kibana pods ready
kubectl get pods

# install fluentd
helm repo add kokuwa https://kokuwaio.github.io/helm-charts
helm install fluentd kokuwa/fluentd-elasticsearch -f fluentd-helm.yaml
```