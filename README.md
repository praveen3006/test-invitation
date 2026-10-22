# Kevin & Pooja — Wedding Invitation

A responsive, single-page wedding invitation inspired by the general layout of the reference site: full-screen cover, celebration details, couple section, countdown and RSVP. This is an original implementation; it does not copy the reference site's source or assets.

## 1. Customize the details

Edit `script.js`, at the top in the `INVITATION` object:
- `weddingDateTime`: ISO date/time with timezone, e.g. `2027-02-14T06:30:00+05:30`
- `weddingDateLabel`, `weddingTime`, `weddingVenue`, `weddingAddress`
- `weddingMapUrl`: Google Maps link to the venue
- Reception fields
- `rsvpUrl`: WhatsApp or RSVP form URL

Replace the sample couple portrait backgrounds in `styles.css` with your own photos if desired. The current photos are remote Unsplash images and require internet access. For private images, put them in an `images/` directory and update the CSS paths; add `COPY images /usr/share/nginx/html/images` to the Dockerfile.

## 2. Run locally with Docker

```bash
docker build -t kevin-pooja-invitation .
docker run --rm -p 8080:80 kevin-pooja-invitation
```

Open http://localhost:8080

## 3. Run locally without Docker

You can use any static web server. For example:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080

## 4. Publish

Build the image, push it to your container registry, and deploy it to your platform (Kubernetes/OpenShift, a VM, or a container service). The site itself is static and does not need a backend.

### OpenShift quick example

```bash
oc new-project kevin-pooja-invite
# Push your image to a registry accessible by the cluster, then:
oc new-app --name=kevin-pooja-invitation --image=YOUR_REGISTRY/kevin-pooja-invitation:latest
oc expose svc/kevin-pooja-invitation
oc get route kevin-pooja-invitation
```

For OpenShift, use an image that runs as a non-root user if your cluster enforces restricted SCC. The stock nginx image may require adjustments for non-root operation. See the non-root note below.

## OpenShift restricted SCC / non-root option

For a restricted OpenShift cluster, replace the Dockerfile with this variant if the base image supports it, or use a supported non-root nginx image. A straightforward option is `nginxinc/nginx-unprivileged`:

```dockerfile
FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
COPY script.js /usr/share/nginx/html/script.js
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1
```

Build that variant with `docker build -t kevin-pooja-invitation:openshift .`, and expose container port 8080 in your deployment if needed.
