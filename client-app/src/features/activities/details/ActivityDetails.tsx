import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ActivityDeailedHeader from "./ActivityDetailedHeader";
import ActivityDeailedInfo from "./ActivityDetailedInfo";
import ActivityDeailedChat from "./ActivityDetailedChat";
import ActivityDeailedSideBar from "./ActivityDetailedSideBar";


export default observer (function ActivityDetails() {

  const {activityStore} = useStore();
  const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore; 
  const {id} = useParams();

  useEffect(() => {
    if(id) loadActivity(id);
  }, [id, loadActivity])

  if (loadingInitial || !activity) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDeailedHeader activity={activity}/>
        <ActivityDeailedInfo activity={activity} />
        <ActivityDeailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDeailedSideBar />
      </Grid.Column>
    </Grid>
  );
})
