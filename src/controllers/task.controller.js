const { createClient } = require('@supabase/supabase-js');

// Configuração do cliente do Supabase
const supabaseUrl = 'https://nqnwtgwyrsogxhmmilbe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xbnd0Z3d5cnNvZ3hobW1pbGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2MjIzODEsImV4cCI6MjA0MzE5ODM4MX0.ar6HR0RfOA96UFzRptSzdMD96GBq5UbiJjroaP-gN3I';
const supabase = createClient(supabaseUrl, supabaseKey);

class TaskController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async getAll() {
    try {
      const { data, error } = await supabase.from('tasks').select('*');

      if (error) throw new Error(error.message);

      this.res.status(200).send(data);
    } catch (error) {
      console.log(error.message)
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

      return this.res.status(200).json({message: "Update successful!"});
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

      console.log(data)
      this.res.status(201).json({message: "Create successful!"});
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

      this.res.status(200).json({message: "Delete successful!"});
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }
}

module.exports = TaskController;