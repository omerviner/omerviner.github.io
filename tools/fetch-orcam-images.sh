#!/bin/sh
# Downloads the OrCam Hear visuals (shared with permission by Rony Dagan and Sarai Beris)
# into images/orcam/. Run once from the repo root: sh tools/fetch-orcam-images.sh
set -e
mkdir -p images/orcam
R=https://cdn.prod.website-files.com/5ee8fe3707db99de593958e8
S=https://cdn.prod.website-files.com/65128f454c84be0d0fe55840
get() { echo "→ $2"; curl -fsSL "$1" -o "images/orcam/$2"; }

# Rony Dagan (UX lead): https://www.ronydagan.com/sec-hear
get "$R/6a329cca608046023c6e6114_Frame%207.avif"                                         hero.avif
get "$R/6a9fa41a61bf9d5ea42786fd_DIAGRAM%2008a%20%C2%B7%20room%2C%20balcony%2C%20outside.avif" model.avif
get "$R/6a9edf1c9369eb90b182740b_room.webp"                                              room.webp
get "$R/6a9edf1c3b50ea40e78453eb_full%20room.webp"                                       full-room.webp
get "$R/6a9edf1c86c96c21c94966f7_stamp.webp"                                             enroll.webp
get "$R/6a9edf1cfb8d01c78a5d9bd4_contact%20list.webp"                                    contacts.webp
get "$R/6a4d5df91f64b2d8cdf554d2_orcam-hear-thumb1-crop.webp"                            thumb.webp

# Sarai Beris (UX/UI design): https://www.saraibdesign.com/orcam-hear-copy
get "$S/6596a84530fe552d1b63ca4e_slide%201.png"                                          flow-1.png
get "$S/6596a97f82eafd20cd8f4752_slide2.png"                                             flow-2.png
get "$S/6596a97e13607c2cbafc2884_slide4.png"                                             flow-3.png
get "$S/6512d5b3939b426cded24199_Group%203559.webp"                                      colors.webp
get "$S/65969d056b52b2ad2bf72865_hear-icons.png"                                         icons.png

echo "Done. Images are in images/orcam/"
