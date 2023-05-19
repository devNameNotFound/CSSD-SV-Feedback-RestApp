import storage from "@sitevision/api/server/storage";
import events from "@sitevision/api/common/events";
const feedbackData = storage.getCollectionDataStore("feedbackStorage");

events.on("sv:publishing:publish", (options) => {
  const feedbackPosts = feedbackData
    .find(`ds.analyzed.pageID:${options.node}`, 100)
    .toArray();

  for (let i in feedbackPosts) {
    if (feedbackPosts[i].isNew === true) {
      const newObj = {
        ...feedbackPosts[i],
        isNew: false,
      };
      try {
        feedbackData.set(feedbackPosts[i].dsid, newObj);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }
});
