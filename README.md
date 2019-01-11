# Set-up
Make sure to either clone this repo in `~/dev/habitica-utils` or update the `habi` command in cli-tools. 

Project assumes the existence of `./secret/credentials.ts` with a valid Habitica id and token in the following format:
```
export const credentials = {
    "habId": "valid-habitica-id",
    "habToken": "valid-habitica-token"
}
```
