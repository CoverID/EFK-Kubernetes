docker build -t coverid/node-hello .

docker push coverid/node-hello

kubectl apply -f ./kube/deploy.yaml

kubectl apply -f ./kube/expose.yaml
