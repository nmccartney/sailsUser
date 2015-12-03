# config valid only for Capistrano 3.1
lock '3.4.0'

set :application, 'sailsUser'
set :repo_url, 'https://github.com/nmccartney/sailsUser'

# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }

# Default deploy_to directory is /var/www/my_app
set :deploy_to, '/opt'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, %w{config/database.yml}

# Default value for linked_dirs is []
# set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
set :keep_releases, 3

namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      # Your restart mechanism here, for example:
      # execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  after :publishing, :restart

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

end


# before 'deploy', 'node:stop'
# after 'deploy', 'node:start'

namespace :node do
  desc "Start node App"
  task :start, :roles => :app do
    puts "**** -STARTING APP- ****"
    run "cd #{current_path}/ && forever start app.js --prod"
  end
  task :stop, :roles => :app do
    puts "**** -STOPING node APP- ****"
    run "cd #{current_path}/ && forever stop app.js"
  end
end

# namespace :npm do
#   task :update, :roles => :app do
#     puts "**** -UPDATING SOCKET APP- ****"
#     run "cd #{current_path}/ && npm update"
#   end
#   task :install, :roles => :app do
#     puts "**** -LISTING SOCKET APPS- ****"
#     run "cd #{current_path}/ && npm install"
#   end
#   task :list, :roles => :app do
#     puts "**** -LISTING SOCKET APPS- ****"
#     run "cd #{current_path}/nodejs_app/ && npm list"
#   end
# end

# namespace :bower do
#   task :install, :roles => :app do
#     puts "**** -bower install- ****"
#     run "cd #{current_path}/ && bower install --allow-root"
#   end
#   task :list, :roles => :app do
#     puts "**** -bower list- ****"
#     run "cd #{current_path}/ && bower list"
#   end
# end

# namespace :grunt do
#   task :build, :roles => :app do
#     puts "**** -grunt build- ****"
#     run "cd #{current_path}/ && grunt build"
#   end
# end