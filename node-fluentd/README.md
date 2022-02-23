docker build -t coverid/node-fluentd
docker push coverid/node-fluentd

kubectl apply -f ./kube/deploy.yaml
kubectl apply -f ./kube/expose.yaml