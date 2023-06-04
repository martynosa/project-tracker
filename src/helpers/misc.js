export const dividerColorPicker = (project) => {
  let color = 'blue';
  if (!project) return color;
  if (project.status === 'inProgress') color = 'orange';
  if (project.status === 'completed') color = 'green';
  return color;
};

export const statusTransformer = (project) => {
  if (!project) return '';

  if (project.status === 'new' || project.status === 'completed')
    return project.status;

  return 'in progress';
};
