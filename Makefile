.PHONY: tag
tag:
	$(eval last_tag=$(shell git describe --tags `git rev-list --tags --max-count=1`))
	$(eval new_tag=$(shell jq --raw-output -- '.version' < ./module.json))

	echo -e "Release $(new_tag)\n\n$$(git shortlog $(last_tag)..@)" | git tag $(new_tag) -F -
