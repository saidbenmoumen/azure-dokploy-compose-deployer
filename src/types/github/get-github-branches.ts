// Auto-generated. Do not edit.
// RouterOutputs["github"]["getGithubBranches"]

export type GithubGetGithubBranches = Array<{
    name: string;
    commit: {
      sha: string;
      url: string;
    };
    protected: false | true;
    protection?: undefined | {
        url?: undefined | string;
        enabled?: undefined | false | true;
        required_status_checks?: undefined | {
            url?: undefined | string;
            enforcement_level?: undefined | string;
            contexts: string[];
            checks: Array<{
                context: string;
                app_id: null | number;
              }>;
            contexts_url?: undefined | string;
            strict?: undefined | false | true;
          };
        enforce_admins?: undefined | {
            url: string;
            enabled: false | true;
          };
        required_pull_request_reviews?: undefined | {
            url?: undefined | string;
            dismissal_restrictions?: undefined | {
                users?: undefined | Array<{
                      name?: undefined | null | string;
                      email?: undefined | null | string;
                      login: string;
                      id: number;
                      node_id: string;
                      avatar_url: string;
                      gravatar_id: null | string;
                      url: string;
                      html_url: string;
                      followers_url: string;
                      following_url: string;
                      gists_url: string;
                      starred_url: string;
                      subscriptions_url: string;
                      organizations_url: string;
                      repos_url: string;
                      events_url: string;
                      received_events_url: string;
                      type: string;
                      site_admin: false | true;
                      starred_at?: undefined | string;
                    }>;
                teams?: undefined | Array<{
                      id: number;
                      node_id: string;
                      name: string;
                      slug: string;
                      description: null | string;
                      privacy?: undefined | string;
                      notification_setting?: undefined | string;
                      permission: string;
                      permissions?: undefined | {
                          pull: false | true;
                          triage: false | true;
                          push: false | true;
                          maintain: false | true;
                          admin: false | true;
                        };
                      url: string;
                      html_url: string;
                      members_url: string;
                      repositories_url: string;
                      parent: null | {
                          id: number;
                          node_id: string;
                          url: string;
                          members_url: string;
                          name: string;
                          description: null | string;
                          permission: string;
                          privacy?: undefined | string;
                          notification_setting?: undefined | string;
                          html_url: string;
                          repositories_url: string;
                          slug: string;
                          ldap_dn?: undefined | string;
                        };
                    }>;
                apps?: undefined | Array<{
                      id: number;
                      slug?: undefined | string;
                      node_id: string;
                      owner: null | {
                          name?: undefined | null | string;
                          email?: undefined | null | string;
                          login: string;
                          id: number;
                          node_id: string;
                          avatar_url: string;
                          gravatar_id: null | string;
                          url: string;
                          html_url: string;
                          followers_url: string;
                          following_url: string;
                          gists_url: string;
                          starred_url: string;
                          subscriptions_url: string;
                          organizations_url: string;
                          repos_url: string;
                          events_url: string;
                          received_events_url: string;
                          type: string;
                          site_admin: false | true;
                          starred_at?: undefined | string;
                        };
                      name: string;
                      description: null | string;
                      external_url: string;
                      html_url: string;
                      created_at: string;
                      updated_at: string;
                      permissions: {
                        issues?: undefined | string;
                        checks?: undefined | string;
                        metadata?: undefined | string;
                        contents?: undefined | string;
                        deployments?: undefined | string;
                      };
                      events: string[];
                      installations_count?: undefined | number;
                      client_id?: undefined | string;
                      client_secret?: undefined | string;
                      webhook_secret?: undefined | null | string;
                      pem?: undefined | string;
                    }>;
                url?: undefined | string;
                users_url?: undefined | string;
                teams_url?: undefined | string;
              };
            bypass_pull_request_allowances?: undefined | {
                users?: undefined | Array<{
                      name?: undefined | null | string;
                      email?: undefined | null | string;
                      login: string;
                      id: number;
                      node_id: string;
                      avatar_url: string;
                      gravatar_id: null | string;
                      url: string;
                      html_url: string;
                      followers_url: string;
                      following_url: string;
                      gists_url: string;
                      starred_url: string;
                      subscriptions_url: string;
                      organizations_url: string;
                      repos_url: string;
                      events_url: string;
                      received_events_url: string;
                      type: string;
                      site_admin: false | true;
                      starred_at?: undefined | string;
                    }>;
                teams?: undefined | Array<{
                      id: number;
                      node_id: string;
                      name: string;
                      slug: string;
                      description: null | string;
                      privacy?: undefined | string;
                      notification_setting?: undefined | string;
                      permission: string;
                      permissions?: undefined | {
                          pull: false | true;
                          triage: false | true;
                          push: false | true;
                          maintain: false | true;
                          admin: false | true;
                        };
                      url: string;
                      html_url: string;
                      members_url: string;
                      repositories_url: string;
                      parent: null | {
                          id: number;
                          node_id: string;
                          url: string;
                          members_url: string;
                          name: string;
                          description: null | string;
                          permission: string;
                          privacy?: undefined | string;
                          notification_setting?: undefined | string;
                          html_url: string;
                          repositories_url: string;
                          slug: string;
                          ldap_dn?: undefined | string;
                        };
                    }>;
                apps?: undefined | Array<{
                      id: number;
                      slug?: undefined | string;
                      node_id: string;
                      owner: null | {
                          name?: undefined | null | string;
                          email?: undefined | null | string;
                          login: string;
                          id: number;
                          node_id: string;
                          avatar_url: string;
                          gravatar_id: null | string;
                          url: string;
                          html_url: string;
                          followers_url: string;
                          following_url: string;
                          gists_url: string;
                          starred_url: string;
                          subscriptions_url: string;
                          organizations_url: string;
                          repos_url: string;
                          events_url: string;
                          received_events_url: string;
                          type: string;
                          site_admin: false | true;
                          starred_at?: undefined | string;
                        };
                      name: string;
                      description: null | string;
                      external_url: string;
                      html_url: string;
                      created_at: string;
                      updated_at: string;
                      permissions: {
                        issues?: undefined | string;
                        checks?: undefined | string;
                        metadata?: undefined | string;
                        contents?: undefined | string;
                        deployments?: undefined | string;
                      };
                      events: string[];
                      installations_count?: undefined | number;
                      client_id?: undefined | string;
                      client_secret?: undefined | string;
                      webhook_secret?: undefined | null | string;
                      pem?: undefined | string;
                    }>;
              };
            dismiss_stale_reviews: false | true;
            require_code_owner_reviews: false | true;
            required_approving_review_count?: undefined | number;
            require_last_push_approval?: undefined | false | true;
          };
        restrictions?: undefined | {
            url: string;
            users_url: string;
            teams_url: string;
            apps_url: string;
            users: Array<{
                login?: undefined | string;
                id?: undefined | number;
                node_id?: undefined | string;
                avatar_url?: undefined | string;
                gravatar_id?: undefined | string;
                url?: undefined | string;
                html_url?: undefined | string;
                followers_url?: undefined | string;
                following_url?: undefined | string;
                gists_url?: undefined | string;
                starred_url?: undefined | string;
                subscriptions_url?: undefined | string;
                organizations_url?: undefined | string;
                repos_url?: undefined | string;
                events_url?: undefined | string;
                received_events_url?: undefined | string;
                type?: undefined | string;
                site_admin?: undefined | false | true;
              }>;
            teams: Array<{
                id?: undefined | number;
                node_id?: undefined | string;
                url?: undefined | string;
                html_url?: undefined | string;
                name?: undefined | string;
                slug?: undefined | string;
                description?: undefined | null | string;
                privacy?: undefined | string;
                notification_setting?: undefined | string;
                permission?: undefined | string;
                members_url?: undefined | string;
                repositories_url?: undefined | string;
                parent?: undefined | null | string;
              }>;
            apps: Array<{
                id?: undefined | number;
                slug?: undefined | string;
                node_id?: undefined | string;
                owner?: undefined | {
                    login?: undefined | string;
                    id?: undefined | number;
                    node_id?: undefined | string;
                    url?: undefined | string;
                    repos_url?: undefined | string;
                    events_url?: undefined | string;
                    hooks_url?: undefined | string;
                    issues_url?: undefined | string;
                    members_url?: undefined | string;
                    public_members_url?: undefined | string;
                    avatar_url?: undefined | string;
                    description?: undefined | string;
                    gravatar_id?: undefined | string;
                    html_url?: undefined | string;
                    followers_url?: undefined | string;
                    following_url?: undefined | string;
                    gists_url?: undefined | string;
                    starred_url?: undefined | string;
                    subscriptions_url?: undefined | string;
                    organizations_url?: undefined | string;
                    received_events_url?: undefined | string;
                    type?: undefined | string;
                    site_admin?: undefined | false | true;
                  };
                name?: undefined | string;
                description?: undefined | string;
                external_url?: undefined | string;
                html_url?: undefined | string;
                created_at?: undefined | string;
                updated_at?: undefined | string;
                permissions?: undefined | {
                    metadata?: undefined | string;
                    contents?: undefined | string;
                    issues?: undefined | string;
                    single_file?: undefined | string;
                  };
                events?: undefined | string[];
              }>;
          };
        required_linear_history?: undefined | {
            enabled?: undefined | false | true;
          };
        allow_force_pushes?: undefined | {
            enabled?: undefined | false | true;
          };
        allow_deletions?: undefined | {
            enabled?: undefined | false | true;
          };
        block_creations?: undefined | {
            enabled?: undefined | false | true;
          };
        required_conversation_resolution?: undefined | {
            enabled?: undefined | false | true;
          };
        name?: undefined | string;
        protection_url?: undefined | string;
        required_signatures?: undefined | {
            url: string;
            enabled: false | true;
          };
        lock_branch?: undefined | {
            enabled?: undefined | false | true;
          };
        allow_fork_syncing?: undefined | {
            enabled?: undefined | false | true;
          };
      };
    protection_url?: undefined | string;
  }>;
