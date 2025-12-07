import revisitpy as rvt
import json

# ==========================================
# 1. Define the Reusable Components
# ==========================================

# The video trial with placeholders {{stimulus}} and {{blur}}
video_trial = rvt.Component(
    base_component="base-video-trial",
    path="_real_virtual_study/assets/sample-stimuli/{{stimulus}}_{{blur}}.mp4",
    response=[{
        "id": "instr",
        "type": "textOnly",
        "location": "belowStimulus",
        "prompt": "Watch the video, then click Next."
    }]
)

# The recognition question with placeholder {{correct_object}}
recog_question = rvt.Component(
    base_component="recognition-question",
    correct_answer=[{
        "id": "recog-q",
        "answer": "{{correct_object}}"
    }],
    response=[{
        "id": "recog-q",
        "prompt": "What object did you see?",
        "location": "belowStimulus",
        "type": "shortText",
        "placeholder": "Answer here"
    }]
)

# The ID question
id_question = rvt.Component(
    type="questionnaire",
    response=[{
        "id": "id-q",
        "prompt": "Was this object real or virtual?",
        "location": "belowStimulus",
        "type": "shortText"
    }],
    correct_answer=[{
        "id": "id-q",
        "answer": "{{real_or_virtual}}"
    }]
)

# ==========================================
# 2. Define the Sequence Logic
# ==========================================

# A "Trial Block" is the pattern: Video -> Recog -> ID
# We define this ONCE, and 'from_data' will repeat it for every row in the CSV
trial_block = rvt.Sequence(
    order="fixed",
    components=[video_trial, recog_question, id_question]
)

# Load data for the 4 groups
# Note: Ensure these file paths are correct relative to where you run python
data_a = rvt.data('_real_virtual_study/assets/group_a.csv')
data_b = rvt.data('_real_virtual_study/assets/group_b.csv')
data_c = rvt.data('_real_virtual_study/assets/group_c.csv')
data_d = rvt.data('_real_virtual_study/assets/group_d.csv')

# Generate the Latin Square Groups using .from_data()
# This automagically creates all 24 trials per group
group_a_seq = trial_block.from_data(data_a)
group_b_seq = trial_block.from_data(data_b)
group_c_seq = trial_block.from_data(data_c)
group_d_seq = trial_block.from_data(data_d)

# ==========================================
# 3. Assemble the Full Study
# ==========================================

# Intro and Consent
intro = rvt.Component(type="markdown", path="_real_virtual_study/assets/observation/part1_intro.md")
consent = rvt.Component(type="markdown", path="_real_virtual_study/assets/observation/part1_consent.md")
post_q = rvt.Component(type="questionnaire", response=[{"id": "q1", "prompt": "Issues?", "type": "longText"}])
end = rvt.Component(type="markdown", path="_real_virtual_study/assets/end.md")

# The Main Sequence
main_sequence = rvt.Sequence(
    order="fixed",
    components=[
        consent,
        intro,
        # The Latin Square Logic
        rvt.Sequence(
            id="group-assignment",
            order="latinSquare",
            num_samples=1,
            components=[
                rvt.Sequence(id="groupA", order="fixed", components=[group_a_seq]),
                rvt.Sequence(id="groupB", order="fixed", components=[group_b_seq]),
                rvt.Sequence(id="groupC", order="fixed", components=[group_c_seq]),
                rvt.Sequence(id="groupD", order="fixed", components=[group_d_seq])
            ]
        ),
        post_q,
        end
    ]
)

# ==========================================
# 4. Config and Export
# ==========================================

study_config = rvt.StudyConfig(
    schema="https://raw.githubusercontent.com/revisit-studies/study/v2.3.2/src/parser/StudyConfigSchema.json",
    study_metadata=rvt.StudyMetadata(
        title="Real vs Virtual Study",
        version="4",
        authors=["Leana"],
        date="2025-12-02",
        description="Generated via revisitpy",
        organizations=["inria"]
    ),
    ui_config=rvt.UiConfig(
        contact_email="",
        help_text_path="_real_virtual_study/assets/observation/help.md",
        logo_path="revisitAssets/revisitLogoSquare.svg",
        with_progress_bar=True,
        study_end_msg="Thank you.",
        url_participant_id_param="PROLIFIC_ID"
    ),
    sequence=main_sequence
)

# Print the JSON string
print(json.dumps(study_config.to_dict(), indent=2))