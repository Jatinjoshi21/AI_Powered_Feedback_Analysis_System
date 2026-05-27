import { useState } from "react";

import "../styles/CreateForm.scss";

export default function CampaignForm({
  submit,

  loading,
}) {
  const [form, setForm] = useState({
    title: "",

    description: "",

    prompt: "",
  });

  return (
    <form
      className="campaign-form"
      onSubmit={(e) => {
        e.preventDefault();

        submit(form);
      }}
    >
      <input
        placeholder="Campaign title"
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,

            title: e.target.value,
          })
        }
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,

            description: e.target.value,
          })
        }
      />

      <textarea
        placeholder="Prompt"
        value={form.prompt}
        onChange={(e) =>
          setForm({
            ...form,

            prompt: e.target.value,
          })
        }
      />

      <button>{loading ? "Creating..." : "Create Campaign"}</button>
    </form>
  );
}
