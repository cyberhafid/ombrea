from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    postgres_host: str = "localhost"
    postgres_port: int = 5435
    postgres_user: str = "postgres"
    postgres_password: str = "postgres123"
    postgres_db: str = "django_db"

    influxdb_url: str = "http://localhost:8086"
    influxdb_token: str = "AdminTokenValue"
    influxdb_org: str = "ombrea"
    influxdb_timeout: int = 60
    influxdb_verify_ssl: bool = True

    @property
    def database_url(self) -> str:
        return (
            f"postgresql://{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )


settings = Settings()
