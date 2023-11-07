const controller = {
  // 'job-budget': jobBudget,
}

export type MetadataId = keyof typeof controller

export const METADATA_IDS = Object.keys(controller) as MetadataId[]

export default controller
