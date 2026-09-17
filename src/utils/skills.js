// The CV's skill list is stored as a single comma-separated string
// (`data.skills`) rather than an array, so every place that reads or
// writes it duplicated the same split/trim/filter/join logic inline.
// Pulling it out here makes it independently testable and keeps
// EditorForm.jsx focused on rendering.

/**
 * Parses the stored comma-separated skills string into a clean array of
 * non-empty, trimmed skill names.
 * @param {string} skillsString
 * @returns {string[]}
 */
export function parseSkills(skillsString) {
  if (!skillsString) return [];
  return skillsString
    .split(',')
    .map((skill) => skill.trim())
    .filter(Boolean);
}

/**
 * Returns a new comma-separated skills string with `newSkill` appended,
 * trimmed, and de-duplicated. Returns the original string unchanged if
 * `newSkill` is blank or already present.
 * @param {string} skillsString
 * @param {string} newSkill
 * @returns {string}
 */
export function addSkillToString(skillsString, newSkill) {
  const trimmed = (newSkill || '').trim();
  if (!trimmed) return skillsString || '';
  const current = parseSkills(skillsString);
  if (current.includes(trimmed)) return current.join(', ');
  return [...current, trimmed].join(', ');
}

/**
 * Returns a new comma-separated skills string with `skillToRemove`
 * removed.
 * @param {string} skillsString
 * @param {string} skillToRemove
 * @returns {string}
 */
export function removeSkillFromString(skillsString, skillToRemove) {
  return parseSkills(skillsString)
    .filter((skill) => skill !== skillToRemove)
    .join(', ');
}
