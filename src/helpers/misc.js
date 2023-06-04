export const dividerColorPicker = (project) => {
  let color = 'loading';
  if (!project) return color;
  if (project.status === 'new') color = 'blue';
  if (project.status === 'inProgress') color = 'orange';
  if (project.status === 'completed') color = 'green';
  return color;
};

export const statusTransformer = (status) => {
  console.log(status);
  if (!status) return '';

  if (status === 'new' || status === 'completed') return status;

  return 'in progress';
};
