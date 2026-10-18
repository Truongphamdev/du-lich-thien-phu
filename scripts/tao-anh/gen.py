import sys, time, json, torch
from diffusers import AutoPipelineForText2Image
torch.set_num_threads(8)
pipe = AutoPipelineForText2Image.from_pretrained("stabilityai/sd-turbo", variant="fp16", torch_dtype=torch.float32)
pipe.set_progress_bar_config(disable=True)
jobs = json.load(open(sys.argv[1]))
out = sys.argv[2]
for j in jobs:
    t = time.time()
    g = torch.Generator().manual_seed(j["seed"])
    img = pipe(prompt=j["prompt"], num_inference_steps=j.get("steps", 4), guidance_scale=0.0,
               width=j["w"], height=j["h"], generator=g).images[0]
    img.save(f"{out}/{j['name']}.png")
    print(j["name"], f"{time.time()-t:.0f}s", flush=True)
