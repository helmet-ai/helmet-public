import mindsdb_sdk
import pandas as pd

# Create MindsDB client

print("Starting!")

mindsdb_server = mindsdb_sdk.connect(login="#LOGIN", password="#PASS")
mindsdb_project = mindsdb_server.get_project()
argument_model = mindsdb_project.get_model("argument_table2")

print("Fiinished setup")

title = "Meta Allows 10-Year-Olds to Use Quest 2 and 3 VR Headsets with Parental Approval"
summary = "Meta has announced that it will permit 10-year-old children to use Meta Quest 2 and 3 VR headsets with parental permission, offering educational apps and games for preteens. Parents will who use the parent-managed Meta accounts will be provided with control over which apps their children use, set time limits, and choose whether their children's data is used to improve the experience. Meta provides information related to children's usage of VR and the possible potential risks like the potential erosion or delay of a child’s reality distinction. The new policy comes as Meta plans to launch its Meta Quest 3 headset this fall."

topic = "Real estate development in the Alaska wilderness"

data = pd.DataFrame({"topic": [topic], "title": [title], "summary": [summary]})

json_res = argument_model.predict(data)["response"][0]
