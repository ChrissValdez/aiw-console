# Fixtures: what a project DECLARES emitting (O4.P13)

Four hand-authored `.project/` folders. None of them is emitted by the projector — they exist
only to put the consumer in states the two real projects cannot both be in at once.

| Fixture | What it is | What it proves |
|---|---|---|
| `todo-presente` | declares three artifacts; all three are on disk; its docs index carries **no** `operator_review_status` | the banner stays OFF when everything declared loads, even though the nine never-emitted legacy routes 404 as always. Docs opens on `all`. |
| `falta-uno` | declares the same three; `docs_index.json` is **deleted from disk** | the banner turns ON and NAMES the missing file. This is the "a declared source failed" case. |
| `sin-declaracion` | a snapshot with **no** `emitted_artifacts` key at all (an older emission) | the consumer cannot narrow, so it does not narrow: any failure lights the banner. Fail loud when you cannot tell. |
| `con-revision` | declares two artifacts; its docs index carries `operator_review_status` on 2 of its 4 entries | Docs opens on `newera` and lists exactly those 2. |

`operator_review_status` appears ONLY in `con-revision`, and it is a fixture value written by
hand for this test — nothing in the console or the emitter ever writes that field into a real
project's index. That is the whole point of deriving the Docs opening mode from its presence
instead of from a project's name.
