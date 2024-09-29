const { createClient } = require('@supabase/supabase-js');

// Configuração do cliente do Supabase
const supabaseUrl = 'https://udxkhssnnpjdmvidjcdu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkeGtoc3NubnBqZG12aWRqY2R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjczMDg3ODQsImV4cCI6MjA0Mjg4NDc4NH0.Pwc8Zk-0CzeWfcQobsPpriS6aVgTf8QZ0ZeT-09qgHI';
const supabase = createClient(supabaseUrl, supabaseKey);

class TaskController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async getAll() {
    try {
      const { data, error } = await supabase
        .from('tasks') // Nome da tabela no Supabase
        .select('*');

      if (error) throw new Error(error.message);

      this.res.status(200).send(data);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async getById() {
    try {
      const taskId = this.req.params.id;

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', taskId); // Busca pelo ID

      if (error) throw new Error(error.message);
      if (!data.length) {
        return this.res.status(404).send({ message: 'Task not found' });
      }

      return this.res.status(200).send(data[0]);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async update() {
    try {
      const taskId = this.req.params.id;
      const TaskData = this.req.body;

      const { data: task, error: findError } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', taskId);

      if (findError) throw new Error(findError.message);
      if (!task.length) {
        return this.res.status(404).send({ message: 'Task not found' });
      }

      const allowedUpdates = ["isCompleted"];
      const requestUpdates = Object.keys(TaskData);

      for (const update of requestUpdates) {
        if (!allowedUpdates.includes(update)) {
          return this.res.status(400).send({ message: 'Not allowed fields to update' });
        }
      }

      // Atualiza a tarefa no Supabase
      const { data, error } = await supabase
        .from('tasks')
        .update(TaskData)
        .eq('id', taskId);

      if (error) throw new Error(error.message);

      return this.res.status(200).send(data[0]);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async create() {
    try {
      const newTaskData = this.req.body;

      const { data, error } = await supabase
        .from('tasks')
        .insert([newTaskData]);

      if (error) throw new Error(error.message);

      this.res.status(201).send(data[0]);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async delete() {
    try {
      const taskId = this.req.params.id;

      const { data: task, error: findError } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', taskId);

      if (findError) throw new Error(findError.message);
      if (!task.length) {
        return this.res.status(404).send({ message: 'Task not found' });
      }

      const { data, error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw new Error(error.message);

      this.res.status(200).send(data[0]);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }
}

module.exports = TaskController;

