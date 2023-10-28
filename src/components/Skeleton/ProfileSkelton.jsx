// ProfileSkelton
import React from "react";
import ContentLoader from "react-content-loader";

const ProfileSkelton = (props) => {
  return (
    <ContentLoader
      width={"100%"}
      height={"100%"}
      viewBox="0 0 400 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="80" y="73" rx="3" ry="3" width="254" height="6" />
      <rect x="78" y="88" rx="3" ry="3" width="254" height="6" />
      <rect x="150" y="103" rx="3" ry="3" width="118" height="6" />
      <circle cx="210" cy="27" r="22" />
      <circle cx="181" cy="151" r="6" />
      <circle cx="211" cy="151" r="6" />
      <circle cx="241" cy="151" r="6" />

      <rect x="26" y="180" rx="4" ry="4" width="20" height="20" />
      <rect x="66" y="180" rx="10" ry="10" width="85" height="19" />
      <rect x="187" y="180" rx="10" ry="10" width="169" height="19" />
      <rect x="401" y="180" rx="10" ry="10" width="85" height="19" />
      <rect x="522" y="180" rx="10" ry="10" width="169" height="19" />
      <rect x="730" y="180" rx="10" ry="10" width="85" height="19" />
      <rect x="851" y="180" rx="10" ry="10" width="85" height="19" />
      <rect x="26" y="220" rx="4" ry="4" width="20" height="20" />
      <rect x="66" y="220" rx="10" ry="10" width="85" height="19" />
      <rect x="187" y="220" rx="10" ry="10" width="169" height="19" />
      <rect x="401" y="220" rx="10" ry="10" width="85" height="19" />
      <rect x="522" y="220" rx="10" ry="10" width="169" height="19" />
      <rect x="730" y="220" rx="10" ry="10" width="85" height="19" />
      <rect x="851" y="220" rx="10" ry="10" width="85" height="19" />

      <rect x="26" y="260" rx="4" ry="4" width="20" height="20" />
      <rect x="66" y="260" rx="10" ry="10" width="85" height="19" />
      <rect x="187" y="260" rx="10" ry="10" width="169" height="19" />
      <rect x="401" y="260" rx="10" ry="10" width="85" height="19" />
      <rect x="522" y="260" rx="10" ry="10" width="169" height="19" />
      <rect x="730" y="260" rx="10" ry="10" width="85" height="19" />
      <rect x="851" y="260" rx="10" ry="10" width="85" height="19" />
      <rect x="26" y="300" rx="4" ry="4" width="20" height="20" />
      <rect x="66" y="300" rx="10" ry="10" width="85" height="19" />
      <rect x="187" y="300" rx="10" ry="10" width="169" height="19" />
      <rect x="401" y="300" rx="10" ry="10" width="85" height="19" />
      <rect x="522" y="300" rx="10" ry="10" width="169" height="19" />
      <rect x="730" y="300" rx="10" ry="10" width="85" height="19" />
      <rect x="851" y="300" rx="10" ry="10" width="85" height="19" />
    </ContentLoader>
  );
};

ProfileSkelton.metadata = {
  name: "Pranay Binju",
  github: "pranaybinju",
  description: "Customer Testimonial Skeleton",
  filename: "ProfileSkelton",
};

export default ProfileSkelton;
